import { createServer, Response } from 'miragejs'
import { GetChannelsResponse } from '@/@types/channels'
import { Message } from '@/@types/messages'
import Config from '@/configs'
import getAaaScopesMockResponse from '@/mocks/api/aaa'
import { getAgentMockResponse } from '@/mocks/api/agent'
import { getChannelsMockResponse } from '@/mocks/api/channels'
import { getMessagesMockResponse } from '@/mocks/api/message'
import { ChannelStatus } from '@/utils/constants/enums'
import { UploadUrlResponse } from './@types/attachments'

type serverConfig = {
  environment?: 'development' | 'test'
  scopeType?: keyof typeof getAaaScopesMockResponse
}

const startMirage = ({
  environment = 'test',
  scopeType = 'lead',
}: serverConfig) => {
  if (!JSON.parse(Config.VITE_USE_MIRAGE)) return
  console.log('🟢 Running mirage mock api')

  return createServer({
    environment,
    routes() {
      const aaa = 'global/aaa/1.0'
      const livechat = 'global/live-chat/1.0'

      this.get(
        `${Config.VITE_BASE_URL}/${aaa}/external/userscopes`,
        () => getAaaScopesMockResponse[scopeType]
      )

      this.post(
        `${Config.VITE_BASE_URL}/${aaa}/logout`,
        () =>
          new Response(
            500,
            {},
            {
              message: 'Failed to logout.',
            }
          )
      )

      this.get(
        `${Config.VITE_BASE_URL}/${livechat}/agents`,
        () => getAgentMockResponse
      )

      this.put(`${Config.VITE_BASE_URL}/${livechat}/agents`, () => ({}))

      this.get(
        `${Config.VITE_BASE_URL}/${livechat}/channels`,
        (_, request) => {
          const { status = ChannelStatus.OPEN } = request.queryParams

          const filteredChannels = getChannelsMockResponse.channels.filter(
            (channel) => channel.tickets[0].status === status
          )

          return {
            channels: filteredChannels,
          } satisfies GetChannelsResponse
        },
        { timing: 2000 }
      )

      this.get(
        `${Config.VITE_BASE_URL}/${livechat}/channels/:id/messages`,
        (_, request) => {
          const { id } = request.params
          const { before_id, page_size } = request.queryParams
          const size = Number(page_size)
          const beforeId = Number(before_id)
          const messages = getMessagesMockResponse(Number(id)).reverse()

          if (beforeId) {
            const index = messages.findIndex((m) => m.id === beforeId)
            if (index === -1)
              return messages.slice(0, size) satisfies Array<Message>
            return messages.slice(
              index + 1,
              index + 1 + size
            ) satisfies Array<Message>
          }

          return messages.slice(0, size) satisfies Array<Message>
        }
      )

      this.put(
        `${Config.VITE_BASE_URL}/${livechat}/channels/resolve`,
        () => ({})
      )

      this.post(
        `${Config.VITE_BASE_URL}/${livechat}/file/upload`,
        (_, request) => {
          const { content_type } = JSON.parse(request.requestBody)
          const imageUrl = 'https://i.imgur.com/S2UsjVz.jpeg'
          const fileUrl =
            'https://cdn.wsform.com/wp-content/uploads/2020/06/industry.csv'
          const videoUrl = 'https://i.imgur.com/2FrfNq6.mp4'

          let url = fileUrl
          if (content_type.includes('video')) {
            url = videoUrl
          } else if (content_type.includes('image')) {
            url = imageUrl
          }

          return {
            upload_url: `${Config.VITE_BASE_URL}/${livechat}/file/signed-url-demo`,
            asset_proxy_url: url,
          } satisfies UploadUrlResponse
        }
      )

      this.put(
        `${Config.VITE_BASE_URL}/${livechat}/file/signed-url-demo`,
        () => ({}),
        { timing: 1000 }
      )
    },
  })
}

export default startMirage

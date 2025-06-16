import { createServer } from 'miragejs'
import Config from '@/configs'
import { mockOrders } from '@/mocks/mockOrders'
import { GetCustomersResponse } from './@types/customers'
import { mockCustomers } from './mocks/mockCustomers'

const startMirage = () => {
  if (Config.VITE_ENVIRONMENT !== 'dev') return

  console.log('🟢 Running mirage mock api')

  return createServer({
    environment: 'test',
    routes() {
      const tbpBaseUrl = `${Config.VITE_BASE_URL}/wms`

      // GET
      this.get('https://modern-bison-62.clerk.accounts.dev/v1/client', () => ({
        response: {
          object: 'client',
          id: 'client_2xILVmlMXsWx6VIbRTcKSDqhuUb',
          sessions: [
            {
              object: 'session',
              id: 'sess_2yMidc1sTlcIUdK2QVit8zElNiN',
              status: 'active',
              expire_at: 1750255731792,
              abandon_at: 1752242931792,
              last_active_at: 1749799027308,
              last_active_organization_id: null,
              actor: null,
              user: {
                id: 'user_2wr67Fuq70ZG6lFdaW62rfw0skE',
                object: 'user',
                username: null,
                first_name: 'Dian Chun',
                last_name: 'Choy',
                image_url:
                  'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yd3I2N0lKdUw5clFXVkdEM05BZ2s4U1Nab1UifQ',
                has_image: true,
                primary_email_address_id: 'idn_2wr66zwLsvO5fqTp0gtDOPDq3Jw',
                primary_phone_number_id: null,
                primary_web3_wallet_id: null,
                password_enabled: false,
                two_factor_enabled: false,
                totp_enabled: false,
                backup_code_enabled: false,
                email_addresses: [
                  {
                    id: 'idn_2wr66zwLsvO5fqTp0gtDOPDq3Jw',
                    object: 'email_address',
                    email_address: 'choydianchun@gmail.com',
                    reserved: false,
                    verification: {
                      status: 'verified',
                      strategy: 'from_oauth_google',
                      attempts: null,
                      expire_at: null,
                    },
                    linked_to: [
                      {
                        type: 'oauth_google',
                        id: 'idn_2wr66ubYIDkCIz0KFuQokAjeATX',
                      },
                    ],
                    matches_sso_connection: false,
                    created_at: 1746787173862,
                    updated_at: 1746787175999,
                  },
                ],
                phone_numbers: [],
                web3_wallets: [],
                passkeys: [],
                external_accounts: [
                  {
                    object: 'external_account',
                    id: 'eac_2wr66w86yQreQH4xXQka42wFtlh',
                    provider: 'oauth_google',
                    identification_id: 'idn_2wr66ubYIDkCIz0KFuQokAjeATX',
                    provider_user_id: '105221436751296309141',
                    approved_scopes:
                      'email https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid profile',
                    email_address: 'choydianchun@gmail.com',
                    first_name: 'Dian Chun',
                    last_name: 'Choy',
                    avatar_url:
                      'https://lh3.googleusercontent.com/a/ACg8ocJSlJ3IiBsN0JEqVHZDmKrBp9EwTmCZanJVsJoFORgBbTOl2sRU=s1000-c',
                    image_url:
                      'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKU2xKM0lpQnNOMEpFcVZIWkRtS3JCcDlFd1RtQ1phbkpWc0pvRk9SZ0JiVE9sMnNSVT1zMTAwMC1jIiwicyI6Ind5YzN4TzZXbGNHV0N0WlpPclpUVitibTR3UTVaSEdOazl5MkVTcDcxSnMifQ',
                    username: '',
                    phone_number: '',
                    public_metadata: {},
                    label: null,
                    created_at: 1746787173856,
                    updated_at: 1749650931768,
                    verification: {
                      status: 'verified',
                      strategy: 'oauth_google',
                      attempts: null,
                      expire_at: 1746787768988,
                    },
                  },
                ],
                saml_accounts: [],
                enterprise_accounts: [],
                public_metadata: {
                  role: 'admin',
                },
                unsafe_metadata: {},
                external_id: null,
                last_sign_in_at: 1749650931792,
                banned: false,
                locked: false,
                lockout_expires_in_seconds: null,
                verification_attempts_remaining: 100,
                created_at: 1746787175992,
                updated_at: 1749650931842,
                delete_self_enabled: true,
                create_organization_enabled: true,
                last_active_at: 1749789754026,
                mfa_enabled_at: null,
                mfa_disabled_at: null,
                legal_accepted_at: null,
                profile_image_url:
                  'https://images.clerk.dev/oauth_google/img_2wr67IJuL9rQWVGD3NAgk8SSZoU',
                organization_memberships: [
                  {
                    object: 'organization_membership',
                    id: 'orgmem_2wxJxkKaP7NQyrjwVumvoWyyZLl',
                    public_metadata: {},
                    role: 'org:admin',
                    role_name: 'Admin',
                    permissions: [
                      'org:sys_profile:manage',
                      'org:sys_profile:delete',
                      'org:sys_memberships:read',
                      'org:sys_memberships:manage',
                      'org:sys_domains:read',
                      'org:sys_domains:manage',
                      'org:sys_billing:read',
                      'org:sys_billing:manage',
                    ],
                    created_at: 1746977539409,
                    updated_at: 1746977539409,
                    organization: {
                      object: 'organization',
                      id: 'org_2wxJv2CNP356VKNHDVrnuK0NJGI',
                      name: 'The Bon Pet',
                      slug: 'the-bon-pet-1746977518',
                      image_url:
                        'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yd3IxQWVZbWx0eUU0MmpQMGZsSmlXSGd2alAiLCJyaWQiOiJvcmdfMnd4SnYyQ05QMzU2VktOSERWcm51SzBOSkdJIiwiaW5pdGlhbHMiOiJUIn0',
                      has_image: false,
                      members_count: 2,
                      pending_invitations_count: 0,
                      max_allowed_memberships: 5,
                      admin_delete_enabled: false,
                      public_metadata: {},
                      created_at: 1746977518125,
                      updated_at: 1746977518125,
                      logo_url: null,
                    },
                  },
                ],
              },
              public_user_data: {
                first_name: 'Dian Chun',
                last_name: 'Choy',
                image_url:
                  'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yd3I2N0lKdUw5clFXVkdEM05BZ2s4U1Nab1UifQ',
                has_image: true,
                identifier: 'choydianchun@gmail.com',
                profile_image_url:
                  'https://images.clerk.dev/oauth_google/img_2wr67IJuL9rQWVGD3NAgk8SSZoU',
              },
              factor_verification_age: [2470, -1],
              created_at: 1749650931792,
              updated_at: 1749799027308,
              last_active_token: {
                object: 'token',
                jwt: 'eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18yd3IxQWVZbWx0eUU0MmpQMGZsSmlXSGd2alAiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJleHAiOjE3NDk3OTkyMzksImZ2YSI6WzI0NzAsLTFdLCJpYXQiOjE3NDk3OTkxNzksImlzcyI6Imh0dHBzOi8vbW9kZXJuLWJpc29uLTYyLmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6ImFkMmJiN2RjODYzZTM5ZDNlOGFlIiwibWV0YWRhdGEiOnsicm9sZSI6ImFkbWluIn0sIm5iZiI6MTc0OTc5OTE2OSwic2lkIjoic2Vzc18yeU1pZGMxc1RsY0lVZEsyUVZpdDh6RWxOaU4iLCJzdWIiOiJ1c2VyXzJ3cjY3RnVxNzBaRzZsRmRhVzYycmZ3MHNrRSIsInYiOjJ9.JvzVT_43CSIT2rYx-d-hmV8hKBwzQwfmObgC1x3FRvAXECgBgGX-xye2DWA3pXBY_qSuPWyRJ6ypDue14wmZ6WRSB9uMM4DuyCY7O4ozT6CHbs0nVzfpSi_x8jkRO1w1B2av8pi0EeP77yJWhQ7tBhwoqW3rOzLPtfKoCHpUlkdz7BCcL2BLAzHF8kQZUJKSTIW9XZLOaMh9JnXp6QT86nlOzV2TrRgtPOar2NWTG6_fwO1ia_yvT7RNb-fr_ywuP4GE2WKHqz9dMDnwQsy38MBZyVwtUIMOL59bvr9TGW9iEpei2NDyBjXvbGF1K26mfjDcei_b0UGCfhtBoTsWoA',
              },
            },
          ],
          sign_in: null,
          sign_up: null,
          last_active_session_id: 'sess_2yMidc1sTlcIUdK2QVit8zElNiN',
          cookie_expires_at: null,
          captcha_bypass: false,
          created_at: 1747620666333,
          updated_at: 1749650931858,
        },
        client: null,
      }))

      this.get(`${tbpBaseUrl}/orders`, () => mockOrders)

      this.get(`${Config.VITE_BASE_URL}/customers`, (_, request) => {
        const { limit, offset } = request.queryParams
        const offsetNum = parseInt(offset as string) || 0
        const limitNum = parseInt(limit as string) || 5
        const customers = mockCustomers.customers.slice(
          offsetNum,
          offsetNum + limitNum
        )

        return {
          customers,
          total: mockCustomers.customers.length,
          limit: limitNum,
          offset: offsetNum,
        } satisfies GetCustomersResponse
      })

      // POST
      this.post(
        'https://modern-bison-62.clerk.accounts.dev/v1/client/sessions/:id/tokens',
        () => ({})
      )

      this.post(
        'https://modern-bison-62.clerk.accounts.dev/v1/client/sessions/tokens',
        () => ({})
      )

      this.post(
        'https://modern-bison-62.clerk.accounts.dev/v1/client/sessions/:id/touch',
        () => ({})
      )

      this.post(
        'https://modern-bison-62.clerk.accounts.dev/v1/environment',
        () => ({
          auth_config: {
            object: 'auth_config',
            id: 'aac_2wr1AfMv9GfzgyhCmz7WUTIUl0t',
            first_name: 'off',
            last_name: 'off',
            email_address: 'off',
            phone_number: 'off',
            username: 'off',
            password: 'off',
            identification_requirements: [['oauth_google'], []],
            identification_strategies: ['oauth_google'],
            first_factors: ['oauth_google', 'ticket'],
            second_factors: [],
            email_address_verification_strategies: [],
            single_session_mode: true,
            enhanced_email_deliverability: false,
            test_mode: true,
            cookieless_dev: true,
            url_based_session_syncing: true,
            claimed_at: null,
            reverification: true,
          },
          display_config: {
            object: 'display_config',
            id: 'display_config_2wr1Ai10ewkYkjtxcU9QT0tQ3HH',
            instance_environment_type: 'development',
            application_name: 'The Bon Pet OMS',
            theme: {
              buttons: {
                font_color: '#ffffff',
                font_family: '"Source Sans Pro", sans-serif',
                font_weight: '600',
              },
              general: {
                color: '#6c47ff',
                padding: '1em',
                box_shadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                font_color: '#151515',
                font_family: '"Source Sans Pro", sans-serif',
                border_radius: '0.5em',
                background_color: '#ffffff',
                label_font_weight: '600',
              },
              accounts: {
                background_color: '#ffffff',
              },
            },
            preferred_sign_in_strategy: 'otp',
            logo_image_url: '',
            favicon_image_url: '',
            home_url: 'http://localhost:3000',
            sign_in_url: 'https://modern-bison-62.accounts.dev/sign-in',
            sign_up_url: 'https://modern-bison-62.accounts.dev/sign-up',
            user_profile_url: 'https://modern-bison-62.accounts.dev/user',
            waitlist_url: 'https://modern-bison-62.accounts.dev/waitlist',
            after_sign_in_url: 'http://localhost:3000',
            after_sign_up_url: 'http://localhost:3000',
            after_sign_out_one_url:
              'https://modern-bison-62.accounts.dev/sign-in/choose',
            after_sign_out_all_url:
              'https://modern-bison-62.accounts.dev/sign-in',
            after_switch_session_url: 'http://localhost:3000',
            after_join_waitlist_url: 'http://localhost:3000',
            organization_profile_url:
              'https://modern-bison-62.accounts.dev/organization',
            create_organization_url:
              'https://modern-bison-62.accounts.dev/create-organization',
            after_leave_organization_url: 'http://localhost:3000',
            after_create_organization_url: 'http://localhost:3000',
            logo_link_url: 'http://localhost:3000',
            support_email: null,
            branded: true,
            experimental_force_oauth_first: false,
            clerk_js_version: '5',
            show_devmode_warning: true,
            google_one_tap_client_id: null,
            help_url: null,
            privacy_policy_url: null,
            terms_url: null,
            logo_url: null,
            favicon_url: null,
            logo_image: null,
            favicon_image: null,
            captcha_public_key: '0x4AAAAAAAWXJGBD7bONzLBd',
            captcha_widget_type: 'smart',
            captcha_public_key_invisible: '0x4AAAAAAAFV93qQdS0ycilX',
            captcha_provider: 'turnstile',
            captcha_oauth_bypass: [],
          },
          user_settings: {
            attributes: {
              email_address: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              phone_number: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              username: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              web3_wallet: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              first_name: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              last_name: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              password: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              authenticator_app: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              ticket: {
                enabled: true,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              backup_code: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
              passkey: {
                enabled: false,
                required: false,
                used_for_first_factor: false,
                first_factors: [],
                used_for_second_factor: false,
                second_factors: [],
                verifications: [],
                verify_at_sign_up: false,
              },
            },
            sign_in: {
              second_factor: {
                required: false,
              },
            },
            sign_up: {
              captcha_enabled: true,
              captcha_widget_type: 'smart',
              custom_action_required: false,
              progressive: true,
              mode: 'public',
              legal_consent_enabled: false,
            },
            restrictions: {
              allowlist: {
                enabled: false,
              },
              blocklist: {
                enabled: false,
              },
              block_email_subaddresses: {
                enabled: false,
              },
              block_disposable_email_domains: {
                enabled: false,
              },
              ignore_dots_for_gmail_addresses: {
                enabled: false,
              },
            },
            username_settings: {
              min_length: 4,
              max_length: 64,
            },
            actions: {
              delete_self: true,
              create_organization: false,
              create_organizations_limit: null,
            },
            attack_protection: {
              user_lockout: {
                enabled: true,
                max_attempts: 100,
                duration_in_minutes: 60,
              },
              pii: {
                enabled: true,
              },
              email_link: {
                require_same_client: true,
              },
            },
            passkey_settings: {
              allow_autofill: true,
              show_sign_in_button: true,
            },
            social: {
              oauth_google: {
                enabled: true,
                required: false,
                authenticatable: true,
                block_email_subaddresses: true,
                strategy: 'oauth_google',
                not_selectable: false,
                deprecated: false,
                name: 'Google',
                logo_url: 'https://img.clerk.com/static/google.png',
              },
            },
            password_settings: {
              disable_hibp: false,
              min_length: 0,
              max_length: 0,
              require_special_char: false,
              require_numbers: false,
              require_uppercase: false,
              require_lowercase: false,
              show_zxcvbn: false,
              min_zxcvbn_strength: 0,
              enforce_hibp_on_sign_in: true,
              allowed_special_characters:
                '!"#$%\u0026\'()*+,-./:;\u003c=\u003e?@[]^_`{|}~',
            },
            saml: {
              enabled: false,
            },
            enterprise_sso: {
              enabled: false,
            },
          },
          organization_settings: {
            enabled: true,
            max_allowed_memberships: 5,
            actions: {
              admin_delete: false,
            },
            domains: {
              enabled: false,
              enrollment_modes: [],
              default_role: 'org:member',
            },
            creator_role: 'org:admin',
          },
          fraud_settings: {
            object: 'fraud_settings',
            native: {
              device_attestation_mode: 'disabled',
            },
          },
          commerce_settings: {
            billing: {
              enabled: false,
              has_paid_user_plans: false,
              has_paid_org_plans: false,
            },
          },
          api_keys_settings: {
            enabled: false,
          },
          maintenance_mode: false,
        })
      )

      this.post('http://localhost:8081/print', () => ({}))

      this.post(`${tbpBaseUrl}/fulfill-order`, () => ({}))

      // PATCH
      this.patch(`${tbpBaseUrl}/orders/:id`, () => ({}))

      // DELETE
      this.delete(`${tbpBaseUrl}/orders/:id/delivery`, () => ({}))
    },
  })
}

export default startMirage

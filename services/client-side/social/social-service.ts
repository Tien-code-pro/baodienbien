'use client'
import { env } from 'next-runtime-env'

export const getSocialClientID = () => {
    const clientIdGoogle: string = env('NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID') || "";
    const clientIdFb: string =
        env('NEXT_PUBLIC_AUTH_FACEBOOK_CLIENT_ID') || "";
    return {
        clientIdGoogle,
        clientIdFb
    }
}
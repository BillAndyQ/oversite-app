"use client"

import { useSession } from "next-auth/react"
import { useCallback } from "react"
import { toast } from "sonner"
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

type Endpoint = {
    method: string
    url: string
}

interface FetchOptions {
    method?: Method
    body?: any
    headers?: Record<string, string>
}

export function useApiClient() {
    const { data: session, status } = useSession()

    const request = useCallback(async (endpoint: Endpoint, options: FetchOptions = {}) => {
        if (status === "loading") {
            await new Promise(resolve => setTimeout(resolve, 50))
            return request(endpoint, options)
        }

        if (!session?.user?.accessToken) {
            throw new Error("No access token found")
        }

        const { method = endpoint.method, body, headers = {} } = options

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint.url}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.user.accessToken}`,
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        })

        if(method === "PATCH" && res.ok) {
            toast("Actualizado correctamente", {duration: 5000})
        }

        if (!res.ok) {
            const error = await res.json().catch(() => ({}))
            throw new Error(error.message || "API request failed")
        }

        return res.json()
    }, [session?.user?.accessToken])

    return { request }
}

import {TProxy} from "./types";

const PROXY_REGEX = /^(http|https|socks5):\/\/([^:]+):([^@]+)@(.+)/;

const deconstructProxy = ({
    proxy
}: {
    proxy: string
}): TProxy | undefined => {
    const match = proxy.match(PROXY_REGEX);

    if(!match) return undefined;

    const protocol = match[1];
    const username = match[2];
    const password = match[3];
    const url = protocol === "socks5"
        ? `${protocol}=${match[4]}`
        : `${protocol}://${match[4]}`;

    return {
        username: username,
        password: password,
        url: url
    }
}

export const getProxy = ({
    proxies
}: {
    proxies: string[]
}): { proxyUsed: string, proxy: TProxy } | undefined => {
    if(!proxies.length)
        return undefined;

    const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];

    const proxy = deconstructProxy({ proxy: randomProxy });

    if(!proxy) throw new Error(`Proxy is not correctly formatted: ${randomProxy}`);

    return {
        proxyUsed: randomProxy,
        proxy: proxy
    }
}

export const sleep = (time: number) => new Promise(res => setTimeout(res, time));
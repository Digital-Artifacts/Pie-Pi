import { http, createConfig } from 'wagmi';
import { avalancheFuji, polygonMumbai} from 'wagmi/chains'
import { injected } from 'wagmi/connectors';

export const config = createConfig({
    chains: [avalancheFuji, polygonMumbai],
    connectors: [injected()],
    transports: {
        [avalancheFuji.id]: http(),
        [polygonMumbai.id]: http(),
    },
})
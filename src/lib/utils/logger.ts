import dayjs from "dayjs";
import pino from "pino";
import logger from "pino"

const transport = pino.transport({
    targets: [
        {
            target: process.env.NODE_ENV === "DEVELOPMENT" ? "pino-pretty" : "pino/file",
            options: process.env.NODE_ENV === "DEVELOPMENT" ? { colorize: true } : { destination: `./log/logs.txt` },
            level: "error"
        },
        {
            target: process.env.NODE_ENV === "DEVELOPMENT" ? "pino-pretty" : "pino/file",
            options: process.env.NODE_ENV === "DEVELOPMENT" ? { colorize: true } : { destination: `./log/logs.txt` },
            level: "info"
        }
    ]
})

const log = logger({
    base: {
        pid: false
    },
    mixin: (_context, level) => {

        return {  }
    },

    timestamp: () => `,"time":"${dayjs().format()}"`
}, transport)

export default log
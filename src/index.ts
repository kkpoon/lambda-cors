import {
    Handler,
    APIGatewayEvent,
    Context,
    ProxyCallback
} from "aws-lambda";

export interface CorsOptions {
    origins: string[];
    allowCredentials: boolean;
    allowMethod?: string[];
    maxAge?: number;
}

export default (options: CorsOptions) => (handler: Handler) =>
    (event: APIGatewayEvent, context: Context, callback: ProxyCallback) =>
        handler(event, context, (err, res) => {
            let matchedCORS = options.origins
                .map(o => o.trim())
                .filter(o => o === event.headers.origin);

            if (matchedCORS.length > 0) {
                res.headers = res.headers || {};
                if (!!options.maxAge) {
                    res.headers["Access-Control-Max-Age"] = options.maxAge;
                }
                res.headers['Access-Control-Allow-Methods'] =
                    options.allowMethod ?
                        options.allowMethod.join(",")
                        : "GET,HEAD,PUT,PATCH,POST,DELETE";
                res.headers['Access-Control-Allow-Credentials'] =
                    JSON.stringify(!!options.allowCredentials);
                res.headers['Access-Control-Allow-Origin'] =
                    event.headers.origin;
            }
            callback(err, res);
        });

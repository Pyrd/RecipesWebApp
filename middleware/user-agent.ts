export default function (context: any) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}

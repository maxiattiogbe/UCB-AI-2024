class Socket {
    wsUrl;
    constructor(wsUrl: any) {
        this.wsUrl = wsUrl;
    }

    ModeCode = {
        // websocket消息类型
        MSG: "message", // 普通消息
        HEART_BEAT: "heart_beat" // 心跳
    };
    ws: any = null;
    webSocketState: boolean = false; // webSocket的连接状态
    heartBeat = {
        // 心跳连接的时间设置
        time: 5 * 1000, // 心跳时间间隔
        timeout: 3 * 1000, // timeout：心跳超时间隔
        reconnect: 10 * 1000 // 断线重连时间
    };
    reconnectTimer: any = null; // 断线重连时间器

    /**
     * 连接ws
     */
    connectWebSocket() {
        this.ws = new WebSocket(this.wsUrl);
        console.log('connectWebSocket()')
        this.init();
    }
    /*
     * 心跳初始函数
     * @param time：心跳时间间隔
     */
    startHeartBeat(time: Number | string) {
        setTimeout(() => {
            this.ws.send(
                JSON.stringify({
                    ModeCode: this.ModeCode.HEART_BEAT,
                    msg: new Date()
                })
            );
            this.waitingServer();
        }, time as any);
    }
    // 延时等待服务端响应，通过webSocketState判断是否连线成功
    waitingServer() {
        this.webSocketState = false;
        setTimeout(() => {
            if (this.webSocketState) {
                this.startHeartBeat(this.heartBeat.time);
                return;
            }
            console.log("心跳无响应，已断线");
            try {
                this.ws.close();
            } catch (e) {
                console.log("连接已关闭，无需关闭");
            }
            this.reconnectWebSocket();
        }, this.heartBeat.timeout);
    }
    // 重连操作
    reconnectWebSocket() {
        this.reconnectTimer = setTimeout(() => {
            this.reconnectWs();
        }, this.heartBeat.reconnect);
    }
    //初始化
    init() {
        this.ws.addEventListener("open", () => {
            this.webSocketState = true; //socket状态设置为连接，做为后面的断线重连的拦截器
            this.heartBeat && this.heartBeat.time ? this.startHeartBeat(this.heartBeat.time) : ""; // 是否启动心跳机制
            console.log("开启");
        });
        this.ws.addEventListener("message", (e: any) => {
            console.log(e.data, "eeeee");
            const data = JSON.parse(e.data);
            switch (data.ModeCode) {
                case this.ModeCode.MSG: // 普通消息
                    console.log("收到消息" + data.msg);
                    break;
                case this.ModeCode.HEART_BEAT: // 心跳
                    this.webSocketState = true;
                    console.log("收到心跳响应" + data.msg);
                    break;
            }
        });
        this.ws.addEventListener("close", (e: any) => {
            this.webSocketState = false; // socket状态设置为断线
            console.log("断开了连接", e);
        });
        this.ws.addEventListener("error", (e: any) => {
            this.webSocketState = false; // socket状态设置为断线
            this.reconnectWebSocket(); // 重连
            console.log("连接发生了错误", e);
        });
    }
    reconnectWs() {
        if (!this.ws) {
            // 第一次执行，初始化
            this.connectWebSocket();
        }
        if (this.ws && this.reconnectTimer) {
            // 防止多个websocket同时执行
            clearTimeout(this.reconnectTimer);
            this.ws.reconnectTimer = null;
            this.connectWebSocket();
        }
    }

    //发送数据
    sendMessage(data: any) {
        this.ws.send(JSON.stringify(data));
    }
    //在其他需要socket地方主动关闭socket
    closeWebSocket(e: any) {
        console.log(e);
        this.ws.close();
        clearTimeout(this.reconnectTimer);
        this.webSocketState = false;
    }
}

export default Socket;
class DelayUtility {
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default DelayUtility;
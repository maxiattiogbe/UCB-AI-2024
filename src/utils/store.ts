class StoreUtility {
    static isEqual(obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    }

    static removeDuplicates(arr) {
        const targetObj = { sender: 'student2@example.com', event: 'start_typing' };
        let foundIndex = -1;

        for (let i = arr.length - 1; i >= 0; i--) {
            const obj = arr[i];
            if (this.isEqual(obj, targetObj)) {
                if (foundIndex === -1) {
                    foundIndex = i;
                } else {
                    arr.splice(i, 1);
                }
            }
        }

        return arr;
    }
    static clearEventBySender(targetSender, arr) {

        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            if (obj.sender === targetSender) {
                obj.event = '';
            }
        }

        return arr;
    }
}

export default StoreUtility;
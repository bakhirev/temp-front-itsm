export default {
    getPosts() {
        return new Promise((resolve, reject) => {
            console.log('URL request');
            setTimeout(() => resolve([1, 2, 3, 4, 5]), 10000)
        });
    }
};
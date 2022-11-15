export function appModel() {
    let token = '';
    let isGuest = true;
    const aud = 'html';

    const setData = function(data) {
        for (let field in data) {
            if (!this.hasOwnProperty(field)) {
                continue;
            }
            this[field] = data[field];
        }
    };
    
    const setDefault = function() {
        token = '';
        isGuest = true;
    };
    
    return {
        token,
        isGuest,
        aud,
        setData,
        setDefault
    };
}

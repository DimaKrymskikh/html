export function filmsModel() {
    let films = [];
    
    const setData = function(data) {
        this.films = data;
    };
    
    return {
        films,
        setData
    };
}

export function filmModel() {
    let filmId;
    let title;
    let description;
    let releaseYear;
    let actorNames;
    let language;

    const setData = function(data) {
        for (let field in data) {
            if (!this.hasOwnProperty(field)) {
                continue;
            }
            this[field] = data[field];
        }
    };
    
    return {
        filmId,
        title,
        description,
        releaseYear,
        actorNames,
        language,
        setData
    };
}

const getters = {
    getCancel(states){
        return states.event.filter(function (d) {
            if (d.type === 3) {
                return d;
            }
        });
    }
};

export default getters;
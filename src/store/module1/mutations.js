import * as types from './mutations_types.js';
module.exports={
    [types.ADDEVENT](states,obj){
        states.count++;
        obj.items.id=states.count;
        states.event.unshift(obj.items);
    }
}
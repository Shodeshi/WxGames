/**
 * Created by Shodeshi on 2014/11/27.
 */
var Logger = Logger ||{
    enabled: true,

    log: function(msg){
        if(Logger.enabled)
            console.log(msg);
    },

    error: function(msg){
        if(Logger.enabled)
            console.error(msg);
    }
}
module.exports = function(RED) {
    function NameFormatterNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.firstName = String(config.firstName);
        node.lastName = String(config.lastName);
        node.format = String(config.format || 'full');
        node.title = String(config.title);
        function nameFormat(name){
            return name.slice(0,1).toUpperCase() + name.slice(1,name.length).toLowerCase();
        }
        node.on('input', function(msg) {
            if(node.format == 'full'){
                if(node.firstName == '' && node.lastName == ''){
                    node.error(RED._("name-formatter.error.no_name"));
                }else{
                    msg.payload = "Hi, " + nameFormat(node.firstName) +" "+ nameFormat(node.lastName) +"!";
                }
            }else if(node.format == 'formal'){
                if(node.lastName == ''){
                    node.error(RED._("name-formatter.error.no_lastName"));
                }else{
                    msg.payload = "Hi, "+node.title+ "." + nameFormat(node.lastName) +"!";
                }
            }else if(node.format == 'informal'){
                if(node.lastName == ''){
                    node.error(RED._("name-formatter.error.no_firstName"));
                }else{
                    msg.payload = "Hi, " + nameFormat(node.firstName) +"!";
                }
            }
            node.send(msg);
        });
    }
    RED.nodes.registerType("name-formatter",NameFormatterNode);
}
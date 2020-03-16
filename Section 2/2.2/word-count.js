module.exports = function(RED) {
  function WordCountNode(config) {
      RED.nodes.createNode(this,config);
      var node = this;
      node.on('input', function(msg) {
        msg.count = msg.payload.split(" ").length;
        node.send(msg);
      });
  }
  RED.nodes.registerType("word-count",WordCountNode);
}
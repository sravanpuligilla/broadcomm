var response = {
    vertices : [
        {
            id :1,
            location:'v1'
        },
        {
            id :2,
            location:'v2'
        },
        {
            id :3,
            location:'v3'
        }
    ],
    edges: [
        {   
            src:'1',
            target: '2'
        },
        {
            src:'2',
            target: '3'
        }
    ]
};


var vertices = response.vertices;

var edges = response.edges;

console.log(buildOutput());

function buildOutput() {
    let source = findSource();
    let resultJSON = {};
    resultJSON.id = source.id;
    resultJSON.location = source.location;
    resultJSON.child = findChild(source);
    return resultJSON;
}

function findSource() {
    let source ;
    let sourceFound = false;

    vertices.map(element => {
        if (!sourceFound) { 
            if (!isTarget(element)) {
                source = element;
                sourceFound = true;
            }
        }
        
    });
    return source;
}

function isTarget(vertex) {
    let result = false;
    edges.map(element => {
        if (element.target === vertex.id) {
            result = true;
        }
    });
    return result;
}

function findChild(vertex) {
    var children = [];
    for (let i = 0; i < edges.length; i++) {       
        if (edges[i].src == vertex.id) {        
            children.push(edges[i]);
        }
    }    
    if (children.length === 0) {
        return null;
    } 

    let resultVertex = new Array() ;

    children.forEach(child => {
        let vertex = {};
        vertex.id = child.target;
        vertex.location = getVertexLocation(vertex.id);
        vertex.child = findChild(vertex);
        resultVertex.push(vertex);
    });
    return resultVertex;
}

function getVertexLocation(id) {
    var result = '';
    vertices.map(vertex => {
        if (vertex.id === id) {
            result = vertex.location;
        }           
    });
    return result;
}






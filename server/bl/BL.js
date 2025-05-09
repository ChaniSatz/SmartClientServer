const dal = require('../dal/DAL');

function getById(id, table) {
    return dal.getById(id, table);
}

function getAll(table) {
    return dal.getAll(table);
}

function getByUserId(userId, table) {
    return dal.getByUserId(userId, table);
}

function create(data, table) {
    return dal.create(data, table);
}

function update(id, data, table) {
    return dal.update(id, data, table);
}

function deleteItem(id, table) {
    return dal.delete(id, table);
}

function getByPostId(postId, table) {
    if (typeof dal.getByPostId !== 'function') {
        return Promise.reject(new Error('getByPostId not implemented for this module'));
    }
    return dal.getByPostId(postId, table);
}

module.exports = {
    getById,
    getAll,
    getByUserId,
    create,
    update,
    deleteItem,
    getByPostId
};

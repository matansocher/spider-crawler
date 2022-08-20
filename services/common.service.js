
function getErrorMessage(err) {
    return err instanceof Error ? err.message : JSON.stringify(err);
}

module.exports = {
    getErrorMessage,
}

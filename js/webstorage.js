/**
 * WebStorage操作をまとめた謎のモジュール。
 */
var WebStorage = (function() {
  var isUsable = (function() {
    function storageAvailable(type) {
      try {
        var storage = window[type],
          x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch ( e ) {
        return false;
      }
    }

    var isUsableLStorage = false;
    if ( storageAvailable('localStorage') ) {
      isUsableLStorage = true;
    }

    var isUsableSStorage = false;
    if ( storageAvailable('localStorage') ) {
      isUsableSStorage = true;
    }

    return {
      local: isUsableLStorage,
      session: isUsableSStorage
    };
  }());

  if ( isUsable.local === false || isUsable.session === false ) { return false; }

  function hasData(key, type) {
    switch ( type ) {
      case 'local':
        if ( localStorage.getItem(key) ) {
          return true;
        }
        return false;
        break;
      case 'session':
        if ( sessionStorage.getItem(key) ) {
          return true;
        }
        return false;
        break;
    }
  }

  function setData(key, value, type) {
    switch ( type ) {
      case 'local':
        localStorage.setItem(key, JSON.stringify(value));
        break;
      case 'session':
        sessionStorage.setItem(key, JSON.stringify(value));
        break;
    }
    return true;
  }

  function getData(key, type) {
    if ( hasData(key, type) === false ) { return false; }
    switch ( type ) {
      case 'local':
        return JSON.parse(localStorage.getItem(key));
        break;
      case 'session':
        return JSON.parse(sessionStorage.getItem(key));
        break;
    }
  }

  function removeData(key, type) {
    if ( hasData(key, type) === false ) { return false; }
    switch ( type ) {
      case 'local':
        localStorage.removeItem(key);
        break;
      case 'session':
        sessionStorage.removeItem(key);
        break;
    }
    return true;
  }

  function clear(type) {
    switch ( type ) {
      case 'local':
        localStorage.clear();
        break;
      case 'session':
        sessionStorage.clear();
        break;
    }
    return true;
  }

  return {
    isUsable: isUsable,
    hasData: hasData,
    setData: setData,
    getData: getData,
    removeData: removeData,
    clear: clear
  };
}());



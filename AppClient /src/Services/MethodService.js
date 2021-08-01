import moment from 'moment';

let MethodService = {};

//ex: iso date to string date  yyyy-dd-mmThh:mm:ssZ - > DD/MM/YYYY
//ex: new Date to iso date  Wed Mar 25 2015 07:00:00 GMT+0700 (Giờ Đông Dương) - > yyyy-dd-mmThh:mm:ssZ || MethodService.formatDate(new Date, "")

let formatDateMoment = 'DD/MM/YYYY';
MethodService.formatDate = function(value, rule) {
  if (value) {
    var format = '';
    if (rule == 'date') {
      format = formatDateMoment;
    } else if (rule == 'datetime') {
      format = formatDateMoment + ' HH:mm';
    } else if (rule == 'aboutTime') {
      format = formatDateMoment + ' HH:mm';
    } else {
      format = rule;
    }
    return moment(value).format(format);
  } else {
    return '';
  }
};
MethodService.sortObjectByKeyDate = function(obj, type) {
  var unordered = obj;
  var ordered = {};

  let keys = Object.keys(unordered);

  if (type == 'asc') {
    keys
      .sort(function(a, b) {
        return new Date(a) - new Date(b);
      })
      .forEach(function(key) {
        ordered[key] = unordered[key];
      });
  }
  if (type == 'desc') {
    keys
      .sort(function(a, b) {
        return new Date(b) - new Date(a);
      })
      .forEach(function(key) {
        ordered[key] = unordered[key];
      });
  }

  return ordered;
};
MethodService.isEmpty = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
MethodService.isString = function(value) {
  return typeof value === 'string' || value instanceof String;
};

MethodService.isNumber = function(value) {
  return typeof value === 'number' && isFinite(value);
};

MethodService.isArray = function(value) {
  return value && typeof value === 'object' && value.constructor === Array;
};

MethodService.isFunction = function(value) {
  return typeof value === 'function';
};

MethodService.isObject = function(value) {
  return value && typeof value === 'object' && value.constructor === Object;
};

MethodService.isDate = function(value) {
  return value instanceof Date;
};

MethodService.isBoolean = function(value) {
  return typeof value === 'boolean';
};

MethodService.isNull = function(value) {
  return value === null;
};

MethodService.isUndefined = function(value) {
  return typeof value === 'undefined';
};

MethodService.checkIsDate = function(day, month, year) {
  var d = parseInt(day);
  var m = parseInt(month);
  var y = parseInt(year);

  var date = new Date(y, m - 1, d);
  if (
    date.getFullYear() == y &&
    date.getMonth() + 1 == m &&
    date.getDate() == d
  ) {
    return true;
  }
  return false;
};

MethodService.copyObject = function(value) {
  return JSON.parse(JSON.stringify(value));
};

// Tìm các phần tử khác nhau có trong mảng object trả về [],
// nếu truyền [object] thì truyển thêm field
// nếu truyền array thì k cần
MethodService.findListItemDifferent = function(arrItem, field) {
  let arrItemNew = [];
  if (field) {
    $.each(arrItem, (index, item) => {
      if (field) {
        if (item[field]) {
          if (arrItemNew.indexOf(item[field]) == -1) {
            arrItemNew.push(item[field]);
          }
        }
      } else {
        if (arrItemNew.indexOf(item) == -1) {
          arrItemNew.push(item);
        }
      }
    });
    return arrItemNew;
  } else {
    return arrItem.filter((item, index) => {
      return arrItem.indexOf(item) === index;
    });
  }
};

MethodService.findListItemDuplicate = function(arrItem1, arrItem2) {
  return arrItem1.filter(function(val) {
    return arrItem2.indexOf(val) != -1;
  });
};

MethodService.checkSDT = function(value) {
  return RegExp(/^(0|\+?84|0084)\d{9}$/).test(value);
};
MethodService.xoa_dau = function(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  return str.toUpperCase();
};
export default MethodService;

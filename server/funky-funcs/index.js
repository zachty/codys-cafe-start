const intersection = (...args) => {
    const filtered = args[0].filter(
        ele => args[1].includes(ele) //&&
        //args[1].indexOf(ele) === args[1].lastIndexOf(ele)
        //TODO: handle duplicates
    );
    if (args.length > 2) {
        return intersection(filtered, ...args.slice(2));
    } else {
        return filtered;
    }
};

const flattenDeep = arr => {
    return arr.reduce((agg, ele) => {
        if (Array.isArray(ele)) {
            let recursedArr = flattenDeep(ele);
            agg = [...agg, ...recursedArr];
            return agg;
        } else {
            agg.push(ele);
            return agg;
        }
    }, []);
};

const flipArguments = func => {
    return (...args) => func(...args.reverse());
};

const invert = obj => {
    const newObj = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            newKey = obj[key];
            newObj[newKey] = key;
        }
    }
    return newObj;
};

const camelCase = str => {
    // return str.split('').reduce((ag, letter, index, array) => {
    //   if(letter === ' ' || letter === '_') return ag
    //   if(array[index-1] === ' ' || array[index-1] === '_') return ag + letter.toUppcercase();
    //   return ag + letter.toLowercase();
    // }, '')

    //match any letter or number followed by one or more space/underscore then replace it  with the last thing in the match as uppercase
    let replaced = str.toLowerCase().replace(/[\s_]+\w/g, match => {
        let letter = match[match.length - 1];
        return `${letter}`.toUpperCase();
    });
    return replaced[0].toLowerCase() + replaced.slice(1);
};

module.exports = {
    intersection,
    flattenDeep,
    flipArguments,
    invert,
    camelCase,
};

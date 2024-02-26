const convertDDMMYYYYSwitchMMDDYYYY = (date?:string) => {
    let result = date;
    if(result){
        result = result.replace(/(\d+)\/(\d+)/, '$2/$1');
    }
    return result;
};

const convertDateSlashToMinus = (date?: string) => {
    let result = date;
    if(result){
        result = result.replace(/\//g, '-');
    }
    return result;
};

const revertDateSlashToMinus = (date?: string) => {
    let result = date;
    if(result){
        result = result.replace(/(\d+)\/(\d)\/(\d+)/, '$3-0$2-$1');
        result = result.replace(/(\d+)\/(\d{2})\/(\d+)/, '$3-$2-$1');
    }
    return result;
};

export {
    convertDDMMYYYYSwitchMMDDYYYY as sDMYTMDY,
    convertDateSlashToMinus,
    revertDateSlashToMinus,
};
export class Helper
{
    static swapArray(Array: any, Swap1: number, Swap2: number): any
    {
        var temp = Array[Swap1];
        Array[Swap1] = Array[Swap2]
        Array[Swap2] = temp
        return Array;
    }

    static generateQuickGuid()
    {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    }

    static loadCssFile(path: string)
    {
        var fileref = document.createElement("link");
        fileref.rel = "stylesheet";
        fileref.type = "text/css";
        fileref.href = path;
        document.getElementsByTagName("head")[0].appendChild(fileref)
    }

    static changeFW(path: string)
    {
        const ele: any = document.getElementById('externalFW');
        ele.href = path;
    }

    static handleCssFileSelect(event)
    {
        const reader = new FileReader()
        reader.onload = (eventR: any) =>
        {
            var style: any = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = eventR.target.result;
            document.getElementsByTagName('head')[0].appendChild(style);
        };
        reader.readAsText(event.target.files[0])
    }
}
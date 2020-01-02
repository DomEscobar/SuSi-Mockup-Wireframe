import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codeFormat'
})
export class CodeFormatPipe implements PipeTransform
{

  transform(str: string): any
  {
    var div = document.createElement('div');
    div.innerHTML = str.trim();
    return this.format(div, 0);
  }

  format(node, level)
  {
    var indentBefore = new Array(level++ + 1).join('  '),
      indentAfter = new Array(level - 1).join('  '),
      textNode;

    for (var i = 0; i < node.children.length; i++)
    {

      textNode = document.createTextNode('\n' + indentBefore);
      node.insertBefore(textNode, node.children[i]);

      this.format(node.children[i], level);

      if (node.lastElementChild == node.children[i])
      {
        textNode = document.createTextNode('\n' + indentAfter);
        node.appendChild(textNode);
      }
    }

    return node.innerHTML;
  }

}

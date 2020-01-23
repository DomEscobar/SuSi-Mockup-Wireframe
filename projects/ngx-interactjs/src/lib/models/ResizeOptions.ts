declare const interact: any;
export class ResizeOptions
{
    edges = { left: true, right: true, bottom: true, top: true };
    modifiers = [
        interact.modifiers.snap({
            targets: [
                interact.createSnapGrid({ x: 15, y: 15 })
            ],
            range: Infinity,
            relativePoints: [{ x: 0, y: 0 }]
        })
    ];

    inertia = true;
    margin: 170;

    resizemove = (event) =>
    {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    };

    resizeend = (event) => { };
}
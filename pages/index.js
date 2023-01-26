import { useState } from "react";

const Index = () => {
    const Tabel = [
        { id: 123, name: 'Карты таро', prise: 21340.00, count: 105, trader: 'Таро ООО' },
        { id: 234, name: 'Спрей сыворотка', prise: 2755.00, count: 74, trader: 'ООО "Дальба"' },
        { id: 456, name: 'Свечи для торта', prise: 99000.00, count: 0, trader: 'Ангельев Руслан Степанович' },
        { id: 789, name: 'Лента светодиодная', prise: 19900.00, count: 0, trader: 'Пургин Деонисий Вечиславович' }
    ]

    const [labels, setLabel] = useState([
        { id: 1, value: ['isChec', false] },
        { id: 2, value: ['name', 'Название'] },
        { id: 3, value: ['id', 'Артикул'] },
        { id: 4, value: ['prise', 'Цена в руб'] },
        { id: 5, value: ['count', 'Продажа, шт'] },
        { id: 6, value: ['ollRevenue', 'Выручка за период'] },
        { id: 7, value: ['revenue', 'Выручка руб'] },
        { id: 8, value: ['bacRevenue', 'Упущеная выручка'] },
        { id: 9, value: ['trader', 'Продавец'] }
    ]);

    const [labelDr, setLabelDr] = useState(null)

    function dragonStart(el, label) {
        setLabelDr(label)
    }

    function dragonEnd(el) {
        // el.target.style.background = 'white'
    }

    function dragonOver(el) {
        el.preventDefault();
        // el.target.style.background = 'lightgrey'
    }

    function checElement(element) {
        let val = Object.values(element)[0]
        if (typeof val === 'boolean') {
            return (<input type="checkbox" className={styles.el} />);
        }
        return (<div className={styles.el}>{val}</div>);
    }

    function checElColon(label, elColon) {
        let elcol = Object.entries(elColon);

        if (typeof label[1] === 'boolean') {
            return (<input type="checkbox" />);
        }

        if (label[0] === 'ollRevenue') {
            return (
                <div >
                    {elColon.prise * elColon.count}
                </div>);
        }

        for (let i = 0; i < elcol.length; ++i) {
            if (elcol[i][0] === label[0]) {
                return (<div>
                    {elColon[label[0]]}
                </div>);
            }
        }
        return (<div></div>)
    };

    function dropColon(el, colon) {
        el.preventDefault();
        setLabel(labels.map(el => {
            if (el.id === colon.id) {
                return { ...el, value: labelDr.value };
            }
            if (el.id === labelDr.id) {
                return { ...el, value: colon.value };
            }
            return el;
        }));

        // el.target.style.background = 'white'
    }

    function checElement(element) {
        if (typeof element === 'boolean') {
            return (<input type="checkbox" />);
        }
        return (<div>{element}</div>);
    }

    function sortColon(col_1, col_2) {
        return col_1.id > col_2.id ? 1 : -1;
    }

    return (
        <div className="window">
            <div className="tabel">
                {labels.sort(sortColon).map(label =>
                    <div className="tabelBase"
                        key={label.id}
                        draggable={true}
                        onDragStart={(el) => dragonStart(el, label)}
                        onDragLeave={(el) => dragonEnd(el)}
                        onDragEnd={(el) => dragonEnd(el)}
                        onDragOver={(el) => dragonOver(el)}
                        onDrop={(el) => dropColon(el, label)}
                    >
                        <div className="elLabel">
                            {checElement(label.value[1])}
                        </div>
                        {Tabel.map((el) => (
                            <div key={el.id} className="elColon" draggable={true}>
                                <span>{checElColon(label.value, el)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div >
    );
}

export default Index;
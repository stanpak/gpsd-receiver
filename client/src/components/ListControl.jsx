import './ListControl.css';


export default function ListControl({ getItems, renderItem }) {
    const items = getItems != null ? getItems() : null;
    return (
        <div className="ListControl" style={{ display: "flex", flexDirection: "column" }}>
            {
                items != null &&
                items.map((item, index) => {
                    return renderItem != null ? renderItem(item, index) : <p>???</p>
                })
            }
        </div>
    );
}
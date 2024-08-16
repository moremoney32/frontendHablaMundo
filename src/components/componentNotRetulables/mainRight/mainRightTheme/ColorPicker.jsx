import React, { useState } from 'react';

const ColorPicker = ({ predefinedColors, setColor }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredColors = predefinedColors.filter(color => 
        color.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une couleur..."
            />
            <div className="color-grid">
                {filteredColors.map(color => (
                    <div 
                        key={color}
                        className="color-box"
                        style={{ backgroundColor: color }}
                        onClick={() => setColor(color)}
                    />
                ))}
            </div>
        </div>
    );
};
/******
 * const MyComponent = () => {
    const [color, setColor] = useState('');

    return (
        <div>
            <input 
                type="text"
                value={color}
                onChange={handleInputChange}
                placeholder="Hex Code"
            />
            {showPicker && (
                <div className="parent_palette_color">
                    <ColorPicker predefinedColors={predefinedColors} setColor={setColor} />
                </div>
            )}
            <div>
                <span>Couleur sélectionnée : </span>
                <span style={{ backgroundColor: color }}>{color}</span>
            </div>
        </div>
    );
};
/*****
 * .color-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.color-box {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border: 1px solid #ccc;
}

 */
 

import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
    items: string[];
    checkedItemsList?: string[];
    onChange: (items: string[]) => void;
}

export default function CheckboxButtons({ items, checkedItemsList, onChange }: Props) {
    
    const [checkedItems, setCheckedItems] = useState(checkedItemsList || [])

    function handleChecked(value: string) {

        const currentIndex = checkedItems.findIndex(item => item === value);
        let newCheckedItems: string[] = [];

        if (currentIndex === -1) {  //New item has been checked, which did not exist already.
            newCheckedItems = [...checkedItems, value];
        }
        else {
            //This means, we are unchecking an existing item, hence exclude that to fill newCheckedItems
            newCheckedItems = checkedItems.filter(item => item !== value)
        }
        setCheckedItems(newCheckedItems);

        onChange(newCheckedItems);
    }



    return (
        <>
            <FormGroup>
                {items.map(item => (
                    <FormControlLabel
                        control={<Checkbox
                            checked={checkedItems.indexOf(item) !== -1}
                            onClick={() => handleChecked(item)}
                        />}
                        label={item}
                        key={item} />
                ))}
            </FormGroup>
        </>
    )
}
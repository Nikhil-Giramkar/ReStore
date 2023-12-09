import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/Basket";


//We wish to make basket, setBasket and removeItem function accessible to all components in the app.
interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket : Basket) => void;
    removeItem : (productId: number, quantity: number) => void; 
}


//We define a Context, which we want to use globally, in any component
export const StoreContext = createContext<StoreContextValue | undefined>(undefined)


// eslint-disable-next-line react-refresh/only-export-components
export function useStoreContext(){

    //anyone who uses useStoreContext hook, will get all the properties within it

    const context = useContext(StoreContext);

    if(context === undefined){
        throw Error('Oops - we do not seem to be within provider');
    }

    return context;
}

export function StoreProvider({children} : PropsWithChildren<unknown>){
    //Define basket and setBasket use
    const [basket, setBasket] = useState<Basket | null>(null);

    //Define what removeItem can do
    function removeItem(productId : number, quantity: number){
        if(!basket) return;

        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === productId);
        if(itemIndex >= 0){
            items[itemIndex].quantity -= quantity;
            if(items[itemIndex].quantity === 0){
                items.splice(itemIndex, 1);
            }

            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }

    return (
        <StoreContext.Provider value = {{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}
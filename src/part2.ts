import {filter, compose, not, reduce, map, reverse, reduceRight } from "ramda"

/* Question 1 */
export const partition: <T>(pred: (val: T) => boolean, arr: T[])=>T[][] =
                            <T>(pred: (val: T) => boolean, arr: T[]): T[][] => {
                                return [arr.filter(pred), arr.filter((x: T) => not(pred(x)))]
                                
                            }

/* Question 2 */
export const mapMat: <T1, T2>(f: (x: T1) => T2, mat: T1[][]) => T2[][] =  
                        <T1, T2>(f: (x: T1) => T2, mat: T1[][]): T2[][] => { 
                            return mat.map((arr: T1[]): T2[] => arr.map(f))         
                        }
/* Question 3 */
export const composeMany: <T>(arr : ((x:T)=>T)[]) => ((x : T) => T) = 
                            <T>(arr : ((x:T)=>T)[]) : (x : T) => T => {
                                if (arr.length === 0){
                                    return ((x : T) => x);
                                }
                                let f : (x:T)=>T = arr[arr.length-1];
                                if(arr.length >= 2){
                                   return (arr.slice(0,arr.length-1)).reduceRight((curr, acc) => compose(acc,curr), f);
                                }
                                return f;
                            }                            

/* Question 4 */
interface Languages {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
}

interface Stats {
    HP: number;
    Attack: number;
    Defense: number;
    "Sp. Attack": number;
    "Sp. Defense": number;
    Speed: number;
}

export interface Pokemon {
    id: number;
    name: Languages;
    type: string[];
    base: Stats;
}

export const maxSpeed: (pokedex: Pokemon[]) => Pokemon[] = 
                        (pokedex: Pokemon[]): Pokemon[] => {
                            let max: number = pokedex.reduce((acc:number, curr:Pokemon)=>{
                                curr.base.Speed > acc ? acc = curr.base.Speed : acc;
                                return acc;
                            }, 0);
                            return filter((x: Pokemon) => x.base.Speed === max, pokedex);
                        }

                

export const grassTypes: (pokedex: Pokemon[]) => string[] = 
                            (pokedex: Pokemon[]): string[] => {
                                return ((pokedex.filter((x: Pokemon) => x.type.includes("Grass"))).map((x: Pokemon) => x.name.english)).sort()
                            }

                            
                            
export const uniqueTypes: (pokedex: Pokemon[]) => string[] = 
                            (pokedex: Pokemon[]): string[] => {
                                let arr: string[] = pokedex.reduce((acc: string[], curr: Pokemon) => acc.concat(curr.type), []);
                                return (arr.reduce((acc: string[] , curr: string) => {
                                    if (not(acc.includes(curr))){
                                        acc =  acc.concat(curr);
                                    }
                                    return acc;
                                }, [])).sort();
                            }


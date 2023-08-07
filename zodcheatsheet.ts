//telepítés:
//npm i zod vagy npm install zod

//importálás a kódunkba:
import { z } from "zod"

//Alap használat:---------------------------------
//Séma készítésére példa:
const UserSchema = z.object({
  username: z.string(),
});

// A beérkező adat sémája
type User = z.infer<typeof UserSchema>;

// { username: string }
const user: User = {username: "Arafat"}

// parsing - elemzés
UserSchema.parse(user); // => {username: "Arafat"}
UserSchema.parse(12); // => ZodError -t fog dobni

// "safe" parsing (nem dob errort ha a validálás megbukik)
UserSchema.safeParse(user); 
// => { success: true; data: {username: "Arafat"} }

UserSchema.safeParse(12); 
// => { success: false; error: ZodError }
//---------------------------------------------------

//Alap típusok:--------------------------------------
//primitív értékek
z.string()
z.number()
z.bigint()
z.boolean()
z.date()
z.symbol()
//üres típusok
z.undefined()
z.null()
z.void()
//catch minden típust
//átengedni minden értéket
z.any()
z.unknown()
//soha típusok
//átengedni nem értékeket
z.never()

//Validációk:-----------------------------------------
optional() //- lehetségessé teszi
nullable //- nullává teszi
nullish //- nullává vagy undefined-ra teszi
//---------------------------------------------------

//Néhány szám speciális validálás:-------------------
z.number().gte(5) //--->> .min(5)
z.number().lte(5) //--->> .max(5)
z.number().int() //--->> az értéknek integer-nek kell lennie
z.number().positive() //--->> >0
z.number().nonnegative() //--->> >=0
z.number().negative() //--->> <0
z.number().nonpositive() //--->> <=0
z.number().multipleOf(5) //--->> osztható 5-el
z.number().finite() //--->> a számnak végesnek kell lennie
//---------------------------------------------------

//Objektek:-------------------------------------------
const Dog = z.object({
    name: z.string(),
    age: z.number()
})
//---------------------------------------------------

//Új mező hozzáadása a sémához:----------------------
const DogWithBreed = Dog.extend({
    breed: z.string()
})
//---------------------------------------------------

//Kombinálni két objekt sémáját:---------------------
const BaseTeacher = z.object({ students: z.array(z.string())})
const HasID = z.object({ id: z.string()})

const Teacher = BaseTeacher.merge(HasID)
type Teacher = z.infer<typeof Teacher> // => { students: string[], id: string}
//---------------------------------------------------

//Átengedni nem definiált mezőket:-------------------
const person = z.object({
    name: z.string()
})

person.parse({
    name: "bob dylan",
    extraKey: 61
})
// => az extraKey nem fog átmenni

person.passthrough().parse({
    name: "bob dylan",
    extraKey: 61
})
// => { name: "bob dylan", extraKey: 61 }
//-----------------------------------------------------

//Nem engedni:-----------------------------------------
const person = z.object({
    name: z.string()
})
.strict()

person.parse({
    name: "bob dylan",
    extraKey: 61
})
// => ZodError hibát dob
//----------------------------------------------------

//String tömb:---------------------------------------------
const stringArray = z.array(z.string())
//---------------------------------------------------

//Tömb vizsgálata, hogy nem üres:---------------------
const nonEmptyStrings = z.string().array().nonempty()

nonEmptyStrings.parse([]) // -->> "Array cannot be empty"
nonEmptyStrings.parse(["Ariana Grande"]) // passes
//------------------------------------------------------

//Min, max, hossz vizsgálat a tömbön:--------------------
z.string().array().min(5) // 5-nél több elemnek kell lennie
z.string().array().max(5) // 5-nél kevesebb elemnek kell lennie
z.string().array().length(5) // 5 elemnek kell lennie
//--------------------------------------------------------

//Rekordok:----------------------------------------------
//Hasznos ha nem ismered a kulcsot és csak az érték érdekel
z.record(z.number()) //-->> Garantálni fogja, hogy minden érték number lesz
z.record(z.string(), z.object({ name: z.string() }))//-->> Validálja, hogy a kulcsok megfelelnek a mintának, az értékek pedig a mintáknak
//-------------------------------------------------------

//Maps:--------------------------------------------------
//Általában ezt szokás használni a rekord helyett
const stringNumberMap = z.map(z.string(), z.number())

type StringNumberMap = z.infer<typeof stringNumberMap>
// type StringNumberMap = Map<string, number>
//-------------------------------------------------------

//Sets:-------------------------------------------------
//Úgy működnek, mint az array-ek
const numberSet = z.set(z.number())
type NumberSet = z.infer<typeof numberSet>
// type NumberSet = Set<number>
//------------------------------------------------------

//Ígéretek:---------------------------------------------
const numberPromise = z.promise(z.number())

numberPromise.parse("tuna")
// ZodError: Non-Promise type: string

numberPromise.parse(Promise.resolve("tuna"))
// => Promise<number>

const test = async () => {
    await numberPromise.parse(Promise.resolve("tuna"))
    // ZodError: Non-number type: string

    await numberPromise.parse(Promise.resolve(3.14))
    // => 3.14
}

//Haladó Validálás:--------------------------------------
const email = z.string().refine((val) => val.endsWith("@gmail.com"),
{message: "Email must end with @gmail.com"}
)
//------------------------------------------------------

//Error kezelés:-----------------------------------------
import { fromZodError } from "zod-validation-error"

console.log(fromZodError(results.error))
//-------------------------------------------------------
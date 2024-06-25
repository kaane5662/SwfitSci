import { Icon } from "next/dist/lib/metadata/types/metadata-types"
import { IconBaseProps } from "react-icons"

interface props{
    title:string,
    children:string,
    icon:IconBaseProps
}

export default function WhyBullet({icon, title, children}:props){
    return(
        <div className="flex gap-8">
            <h1>{icon}</h1>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p className="text-md text-secondary text-opacity-50">{children}</p>
            </div>
        </div>
    )
}
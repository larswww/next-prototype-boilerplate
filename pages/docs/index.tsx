import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {useRouter} from "next/router";
import {useEffect} from "react";

export async function getStaticProps() {
    const showDocs = process.env.PUBLIC_SWAGGER_DOCS === 'enabled'
    const definitionPath = process.env.OPENAPI_DEFINITION_FILE_PATH
    return {props: {showDocs, definitionPath}}
}

interface DocsProps {
    showDocs: boolean,
    definitionPath: string
}

const Docs = (props: DocsProps) => {
    const router = useRouter()

    /**
     * Redirect if PUBLIC_SWAGGER_DOCS in .env is not set to 'enabled'
     */
    useEffect(() => {
        if (!props.showDocs) {
            router.push('/')
        }
    }, [props.showDocs, router])

    return (
        <SwaggerUI url={props.definitionPath}/>
    )
}

export default Docs
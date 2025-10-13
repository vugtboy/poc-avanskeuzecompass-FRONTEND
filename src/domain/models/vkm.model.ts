import type { IVKM } from "../interfaces/Ivkm.model"

export class VKM implements IVKM {
    id: string
    name: string
    shortdescription: string
    description: string
    content: string
    location: string
    studycredit: number
    contact_id: number
    level: string
    learningoutcomes: string

    constructor(
        id: string,
        name: string,
        shortdescription: string,
        description: string,
        content: string,
        location: string,
        studycredit: number,
        contact_id: number,
        level: string,
        learningoutcomes: string
    ) {
        this.id = id
        this.name = name
        this.shortdescription = shortdescription
        this.description = description
        this.content = content
        this.location = location
        this.studycredit = studycredit
        this.contact_id = contact_id
        this.level = level
        this.learningoutcomes = learningoutcomes
    }
}




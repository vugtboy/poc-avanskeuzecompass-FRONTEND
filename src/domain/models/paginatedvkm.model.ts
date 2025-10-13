import {VKM} from "./vkm.model"

export class PaginatedVKM {
    vkms: VKM[]
    total: number

    constructor(vkms: VKM[], total: number) {
        this.vkms = vkms
        this.total = total
    }
}
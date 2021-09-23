import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class GlobalEvents {

    public dataLoadRequested: EventEmitter<void> = new EventEmitter<void>();
    public dataLoadDone: EventEmitter<void> = new EventEmitter<void>();
    
    // year distribution
    public yearDistributionLoaded: EventEmitter<void> = new EventEmitter<void>();
    
}
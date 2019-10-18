import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { IObject } from './app/list.I';

const STORAGE_KEY = 'local_todolist';

@Injectable()
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) public storage: StorageService) { }

    public doSomethingAwesome() {
        const firstList: IObject[] = this.storage.get(STORAGE_KEY) || [];
        firstList.push(
            { id: 1, item: 'Hit the gym', checkState: true },
            { id: 2, item: 'Pay bills', checkState: true },
            { id: 3, item: 'Meet George', checkState: true },
            { id: 4, item: 'Buy eggs', checkState: true },
            { id: 5, item: 'Read a book', checkState: true },
            { id: 6, item: 'Organize office', checkState: true }
        )
        this.storage.set(STORAGE_KEY, firstList);
    }
}




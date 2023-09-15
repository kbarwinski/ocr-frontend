import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { baseUrl } from './constants/baseurl';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(baseUrl + '/progressHub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public addTransferDataListener = (
    messageContents: string,
    callbackFn: () => void
  ) => {
    this.hubConnection.on('ReceiveMessage', (data: string) => {
      if (data.startsWith(messageContents)) {
        console.log(data);
        callbackFn();
      }
    });
  };
}

# Program Assignment Exif Viewer

Questo progetto realizzato con il framework Angular, permette di visualizzare immagini 
in formato jpeg con i loro relativi metadata EXIF. Il lavoro è stato sviluppato seguendo
le linee guida riportate nel file ImageEXIFViewer.pdf implementando anche la funzionalità extra
di **geolocalizzazione**.

## Struttura del Progetto
Il progetto è articolato in diversi componenti ognuno dei quali è composto da un file _html_
che ne definisce la struttura, un file _typscript_ che implementa la logica
di controllo e un file _scss_ per definire l'aspetto grafico.

Sono presenti 3 componenti principali:

1. **app**: rappresenta il componente principale che viene mostrato. Contiene la barra 
   attraverso la quale caricare l'immagine da visualizzare e i componenti che servono per
   mostrare l'immagine e i suoi dati EXIF. Si occupa di gestire il caricamento dell'immagine
   da parte dell'utente e di estrarre i dati EXIF.
   
2. **exif-data**: prende come input dall'app-component i dati EXIF estratti dall'immagine 
   e li mostra in un formato gradevole per l'utente.
   
3. **image-box**: dall'app-component prende in ingresso l'immagine da mostrare. Ha il 
   compito di gestire le dimensioni dell'immagine fino ad una dimensione massima di 512x512
   pixel, e di adattarle alle dimensioni della finestra. Inoltre gestisce
   la rotazione dell'immagine attraverso appositi pulsanti e combinazioni di tasti.
   `shift + r`  `shift + l`.
   
All'interno della cartella _models_ è presente la classe _section_ che permette di organizzare
i dati EXIF che vengono poi mostrati. Ogni _section_ ha un titolo 
e una lista di coppie key-value dove la key rappresenta il nome di un tag EXIF 
mentre value ne fornisce il valore.

Il servizio _exif-parser_ permette di organizzare i dati EXIF estratti dall'immagine attraverso
la libreria **exifr** in un elenco di _section_ le quali poi possono essere interpretate dal
componente exif-data in modo da mostrarli all'utente.

## Esecuzione
Una volta scaricato il progetto per prima cosa è necessario installare le dipendenze
attraverso il comando `npm install`. Una volta completata l'istallazione è possibile 
eseguire l'applicazione con il comando `npm start` visualizzandola all'indirizzo
[ http://localhost:4200](http://localhost:4200).

L'applicazione è disponibile anche all'indirizzo
[http://andreawebsites.altervista.org](http://andreawebsites.altervista.org)

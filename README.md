Moikrewni.PL - Alternative Search with result of Surname Map as Image.
===
Alternative Search of Moikrewni.PL images (built, using access to Amazon images, which might be offline soon).


Credits to [Łukasz Macuga](https://www.facebook.com/MacugaLukasz) 
(During [discussion on Facebook](https://www.facebook.com/groups/GenealogiaGenetyczna/permalink/832519463604318/), he mentioned as an idea of implementing "search" tool. So I did it.

Łukasz Macuga:
> 25 maja zniknął bardzo przydatny genealogom serwis moikrewni.pl, a szczególnie chodzi tu o jego mapy nazwisk. Przejęło go MyHeritage i nie zaoferowało niestety nic w zamian tylko przekierowuje do nich na główną...
Na szczęście mapy były na innym serwerze i cały czas są dostępne:)

Łukasz Macuga:
> Wystarczy użyc tego linku:

```
http://s3.amazonaws.com/12XN8SEM7ZEYVXRQQ702-maps-pl/kowalski_kompletny.png
```

Łukasz Macuga:
> jak podałem wcześniej w komentarzu, te nazwy plików nie zmieniły się od 2008 według archive.org wiec powinny wisiec jeszcze długo na amazon.


## Amazon Files Structure

behind url `http://s3.amazonaws.com/12XN8SEM7ZEYVXRQQ702-maps-pl/` there is XML response, which retrieving by simple GET request.

```
<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    
    <Name>12XN8SEM7ZEYVXRQQ702-maps-pl</Name>
    <Prefix/>
    <Marker/>
    <MaxKeys>1000</MaxKeys>
    <IsTruncated>true</IsTruncated>
    
    <Contents>
        <Key>%C3%B3brien_kompletny.png</Key>
        <LastModified>2007-12-10T09:08:19.000Z</LastModified>
        <ETag>"d37577d83766359f8b4e0b9db7a7e10d"</ETag>
        <Size>19366</Size>
        <StorageClass>STANDARD</StorageClass>
    </Contents>

    <Contents>
        <Key>%C3%B3brien_sml.png</Key>
        <LastModified>2007-11-29T15:45:48.000Z</LastModified>
        <ETag>"e1414b585ce19d0b2b354577056716c7"</ETag>
        <Size>1485</Size>
        <StorageClass>STANDARD</StorageClass>
    </Contents>
    ....

</ListBucketResult>
```

Author
Andrii Lundiak

License 
Free
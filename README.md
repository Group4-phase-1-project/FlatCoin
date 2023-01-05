# FlatCoin 

FlatCoin is a cryptocurrency data aggregator site that lists the current most searched and trending crypto daily. 
 
# Project Requirements
 
## 1. The first requirement asks for a few things:
- Use of an API
- The API returns a lists of at least five objects with at least three attributes per object
- Interaction between the client and the API should be asynchronous utilizing JSON </br>
 
For our API, we used an API that contains data for current trending cryptocoins. The API we used contains seven objects with ten attributes. We used all seven objects or "cryptocoins", and three of the attributes, the name, symbol, and image. To make it asynchronous, we added a script to the html to defer the source so the page wouldn't load until our javascript was executed.
</br>
</br>
 
## 2. The second requirement asks for two things:
- Everything to run on one page,
- For there to be no redirects to another website, or for the page to reload.
 
Our page contains everything on one page without any external links, and we prevented default on any other submit buttons on our page to prevent reloading.
</br>
</br>
 
## 3. The third requirement asks for three distinct event listeners.
Our first event listener is a 'click' event listener that either opens or closes popups on button clicks. The second event listener is 

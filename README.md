# Flipkart Grid 5.0

<div style="display:flex;justify-content:center;width:100%>

![ GIF](https://github.com/paramsgit/Flipkart_Grid_5/raw/main/frontend/src/assets/ReadmeFiles/Video.gif)

</div>

## Problem Statement

1. Gen AI-powered fashion outfit generator for Flipkart that revolutionizes the way users 
discover and create personalized fashion outfits, in a natural conversational way
2. The fashion outfit generator should have the ability to analyze a user's past purchase 
history and understand their preferred style, color choices, and favorite brands
3. It should be able to analyze current fashion trends, styles, and influencers on 
platforms like Instagram, Pinterest, and fashion blogs.

## Project Features

<div style="display:flex;justify-content:center;width:100%;margin:20px>

![Block Diagram 1](./frontend/src/assets/ReadmeFiles/Flow1.png)
</div>

##

- **GenAI Integration**: The project integrates a fine-tuned GenAI model to analyze user data, provide tags, categories, and subcategories, and deliver personalized outfit recommendations. The recommendations are generated by considering factors such as social media trends, user experiences, ratings, and historical product ordering.

- **Web Model**: A functional web-based model has been developed, enabling users to interact with a chatbot for outfit recommendations.

- **LangChain Framework**: The project employs the LangChain framework for seamless communication with the AI model.

- **Recommendation System**: A recommendation system is in place, offering product suggestions to users based on their historical interactions, ratings, current trends, and order counts for specific products.

## Social Media Trend Analysis

<div style="display:flex;justify-content:center;width:100%;margin:20px>

![Block Diagram 1](https://github.com/paramsgit/Flipkart_Grid_5/raw/main/frontend/src/assets/ReadmeFiles/Flow3.png)

</div>

##
### Data Collection

- Data collection from fashion influencers on social media and fashion blogs is facilitated using web scraping techniques and APIs, such as Selenium and Instaloader. The collected data is stored in CSV format.

### Outfit Detection

- Outfit detection in influencer posts is performed using the pyTorch-based langSAM model. This is followed by image cropping using OpenCV and matplotlib.

- Features are extracted from cropped images with the help of Max Pooling, TensorFlow, Keras, Sklearn, Resnet, and Image Net. These features are then matched with products in the database, and Trend Scores are assigned based on similarity.

- For fashion blog data, sentiment analysis is conducted using spaCy to identify trending outfits.

- The trend analysis system operates as a microservice, ensuring seamless operation alongside the website.

## Recommendation System


<div style="display:flex;justify-content:center;width:100%;margin:20px>

![Block Diagram 1](https://github.com/paramsgit/Flipkart_Grid_5/raw/main/frontend/src/assets/ReadmeFiles/Flow2.png)

</div>

##

- The recommendation system is designed to suggest products based on criteria such as high ratings, order frequency, current trends, and user historical interactions.

### Limitations

- The project encounters limitations related to GenAI models, such as GPT and Llama, which have maximum token limits. These constraints restrict the length of input and output sequences in each interaction.

- The performance of the system is confined to the scope of the dataset. The absence of a diverse or comprehensive dataset may impact the accuracy of recommendations, even though extensive testing has been performed on the provided dataset.

- Initial recommendations may lack a high degree of personalization until the system accumulates an adequate amount of user data.

- Despite the conversational approach enhancing personalization, the algorithm may face challenges in identifying subtle contextual cues, humor, or sarcasm in user interactions.

# Urban Rhapsody

![Urban Rhapsody Analysis Flow](https://github.com/VIDA-NYU/Urban-Rhapsody/teaser2_compressed (1).pdf)

Noise is one of the primary quality-of-life issues in urban environments. In addition to annoyance, noise negatively impacts public health and educational attainment.While low-cost sensors can be deployed to monitor ambient noise levels at high temporal resolutions, the amount of data they produce and the complexity of these data pose significant analysis challenges. One way to address these challenges is through machine listening techniques, which are used to extract features in attempts to classify the source of noise and understand temporal patterns of a city's noise situation. However, the unlimited number of noise sources in the urban environment and the scarcity of labeled data makes it nearly impossible to create classification models with large enough vocabularies that capture the true dynamism of urban soundscapes. In this paper, we first identify a set of requirements in the yet unexplored domain of urban soundscape exploration. To satisfy the requirements and tackle the identified challenges, we propose Urban Rhapsody, a framework that combines state-of-the-art audio representation, machine learning and visual analytics to allow users to interactively create classification models and derive insights about noise patterns in the city and quickly retrieve and label audio excerpts in order to create a large high-precision annotated database of urban audio recordings. We demonstrate the tool’s utility through case studies performed by domain experts using data generated over the five-year deployment of a one-of-a-kind sensor network in New York City.


## This repository contains the source code for the Urban Rhapsody system.

It contains both the source code for the frontend application of the system and the backend servers. Find appropriate commands to run servers and the application bellow:


For each of the servers (aiserver, userserver, dataserver and annserver) there's a *server.py* file that should be executed as below:

``` python server.py```

For the frontend application you should navigate to */vis/urbanrhapsody* and run the following commands:

```
npm install
ng serve
```

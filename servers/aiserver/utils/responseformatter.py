from os import stat

class ResponseFormatter:


    @staticmethod
    def format_ann_response( responseList ):

        datesCounter = {}
        for file in responseList:
            
            day = file.split('/')[-2]

            if(day in datesCounter):
                datesCounter[day] = 0
            datesCounter[day] += 1

        return datesCounter
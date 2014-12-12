/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package shodeshi.util;

import java.util.Random;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonBuilderFactory;

/**
 *
 * @author tyang
 */
public class Utils {

    public static int[][] createBoardArray() {
        int boardArr[][] = new int[9][10];
        int initArr[][] = {{0, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0}, {8, 0}, {1, 2}, {7, 2}, {0, 3}, {2, 3}, {4, 3}, {6, 3}, {8, 3}, {0, 9}, {1, 9}, {2, 9}, {3, 9}, {4, 9}, {5, 9}, {6, 9}, {7, 9}, {8, 9}, {1, 7}, {7, 7}, {0, 6}, {2, 6}, {4, 6}, {6, 6}, {8, 6}};
        int chessArr[] = getRandomChessArray();
        for (int i = 0; i < initArr.length; i++) {
            int x = initArr[i][0];
            int y = initArr[i][1];
            boardArr[x][y] = chessArr[i] + 100;
        }
        return boardArr;
    }

    public static int[] getRandomChessArray() {
        int[] array = {/*黑帅*/11, /*黑车*/ 12, 12, /*黑马*/ 13, 13, /*黑炮*/ 14, 14, /*黑象*/ 15, 15,/*黑士*/ 16, 16, /*黑卒*/ 17, 17, 17, 17, 17,/*红帅*/ 21, /*红车*/ 22, 22, /*红马*/ 23, 23, /*红炮*/ 24, 24, /*红象*/ 25, 25,/*红士*/ 26, 26, /*红卒*/ 27, 27, 27, 27, 27};
        Random ran = new Random();
        for (int i = array.length - 1; i >= 0; i--) {
            int select = ran.nextInt(i + 1);
            if (select == i) {
                continue;
            }
            int temp = array[i];
            array[i] = array[select];
            array[select] = temp;
        }

        return array;
    }
    
    public static String convertBoardArrayToJsonString(int[][] boardArr){
        JsonBuilderFactory factory = Json.createBuilderFactory(null);
        JsonArrayBuilder builder = factory.createArrayBuilder();
        for(int i=0;i<boardArr.length;i++){
            int[] row = boardArr[i];
            JsonArrayBuilder rowBuilder = factory.createArrayBuilder();
            for(int j=0;j<row.length;j++){
                rowBuilder.add(row[j]);
            }
            builder.add(rowBuilder.build());
        }
        return builder.build().toString();
    }
}

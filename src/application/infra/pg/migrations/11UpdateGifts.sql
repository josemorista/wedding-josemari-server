update item set average_price=32.94 where id=29;
update item set average_price=239.99,suggested_seller='https://www.marisa.com.br/jogo-de-cama-casal-home-design-lars-santista-4-pe%c3%a7as-cinza/p/10053721884?IdParceiro=00017000&gclid=CjwKCAiA76-dBhByEiwAA0_s9eZkTCQOeXqg2TAmoaMjEbm2LtPUeW6h4ry_BYLJ9At2ZNHvgul0fhoCZIAQAvD_BwE&siteName=Marisa'
where id=18;
delete from item where id in (19,20,21,23,24,25,27,12);
insert into item(id, name, picture, quantity_available_to_give, quantity_needed, average_price, suggested_seller) values
(38, 'Multiprocessador de Alimentos Mondial', 'multiprocessador.webp', 1, 1, 279.00, 'https://www.magazineluiza.com.br/multiprocessador-de-alimentos-mondial-preto-turbo-chef-mpn-01-b-5-funcoes-1000w/p/234419900/ep/prsa/'),
(39, 'Sanduicheira e Grill Britânia', 'sanduicheira.webp', 1, 1, 119.99, 'https://www.magazineluiza.com.br/sanduicheira-e-grill-britania-bgr27i-press-2-em-1-850w-220v-inox/p/aaac2j1d72/ep/epgr/');

insert into item(id, name, picture, quantity_available_to_give, quantity_needed, average_price, suggested_seller) values
(40, 'Petisqueira Grande Ecokitchen', 'petisqueira.jpg', 1, 1, 59.99, 'https://www.amazon.com.br/Petisqueira-Ecokitchen-Mimo-Style-BM1418/dp/B077L7P4HF'),
(41, 'Caminho de Mesa Raye 38 cm x 1,60 m', 'caminho.webp', 1, 1, 49.99, 'https://www.camicado.com.br/p/caminho-de-mesa-raye-38-cm-x-160-m-home-style/-/A-300049375-br.lc?sku=000000000000049375&utm_id=18288222626'),
(42, 'Kit Potes de Plástico Herméticos Electrolux', 'potes.jpg', 1, 1, 81.90, 'https://www.amazon.com.br/Kit-Potes-para-Alimentos-Electrolux/dp/B0784CLYGQ'),
(43, 'Conjunto para Fondue Brinox Vermelho', 'fondue.jpg', 1, 1, 125.89, 'https://www.amazon.com.br/Conjunto-Fondue-Chocolate-Pecas-Brinox/dp/B07QQV4HVQ');